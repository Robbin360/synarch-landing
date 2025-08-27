'use client'

import { useEffect, useRef, useCallback } from 'react'

// Memory management interfaces
interface MemoryState {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
  allocatedMemory: number
  leakSuspects: MemoryLeak[]
  activeReferences: number
  cleanupTasks: number
}

interface MemoryLeak {
  id: string
  type: 'dom' | 'event' | 'observer' | 'animation' | 'worker' | 'unknown'
  description: string
  size: number
  timestamp: number
  stack?: string
  component?: string
}

interface MemoryCleanupTask {
  id: string
  name: string
  cleanup: () => void
  priority: 'low' | 'medium' | 'high' | 'critical'
  component?: string
  createdAt: number
}

interface MemoryPressureEvent {
  level: 'normal' | 'moderate' | 'critical'
  usedMemory: number
  availableMemory: number
  timestamp: number
  actions: string[]
}

// Advanced Memory Manager
class MemoryManager {
  private static instance: MemoryManager
  private cleanupTasks: Map<string, MemoryCleanupTask> = new Map()
  private memoryObservers: Set<(state: MemoryState) => void> = new Set()
  private leaks: MemoryLeak[] = []
  private pressureEvents: MemoryPressureEvent[] = []
  private isMonitoring = false
  private monitoringInterval: NodeJS.Timeout | null = null
  private baselineMemory = 0
  private memoryTrend: number[] = []

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager()
    }
    return MemoryManager.instance
  }

  // Start memory monitoring
  startMonitoring(intervalMs = 5000) {
    if (this.isMonitoring) return
    
    this.isMonitoring = true
    this.baselineMemory = this.getCurrentMemoryUsage()
    
    this.monitoringInterval = setInterval(() => {
      this.checkMemoryPressure()
      this.detectLeaks()
      this.notifyObservers()
    }, intervalMs)
    
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    window.addEventListener('blur', this.handleWindowBlur)
    window.addEventListener('focus', this.handleWindowFocus)
  }

  // Register cleanup task
  registerCleanup(
    id: string, 
    name: string, 
    cleanup: () => void, 
    priority: MemoryCleanupTask['priority'] = 'medium',
    component?: string
  ) {
    const task: MemoryCleanupTask = {
      id, name, cleanup, priority, component, createdAt: Date.now()
    }
    
    this.cleanupTasks.set(id, task)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MemoryManager] Registered cleanup: ${name}`)
    }
  }

  // Execute cleanup tasks by priority
  executeCleanupByPriority(targetPriority?: MemoryCleanupTask['priority']) {
    const priorities: MemoryCleanupTask['priority'][] = ['critical', 'high', 'medium', 'low']
    let executedCount = 0
    
    for (const priority of priorities) {
      if (targetPriority && priority !== targetPriority) continue
      
      const tasksToExecute = Array.from(this.cleanupTasks.values())
        .filter(task => task.priority === priority)
      
      for (const task of tasksToExecute) {
        try {
          task.cleanup()
          this.cleanupTasks.delete(task.id)
          executedCount++
        } catch (error) {
          console.error(`Cleanup failed: ${task.name}`, error)
          this.cleanupTasks.delete(task.id)
        }
      }
      
      if (targetPriority) break
    }
    
    return executedCount
  }

  // Force garbage collection
  forceGarbageCollection() {
    if (typeof window !== 'undefined' && window.gc) {
      try {
        window.gc()
        return true
      } catch (error) {
        console.warn('Failed to force GC:', error)
      }
    }
    return false
  }

  // Check for memory pressure
  private checkMemoryPressure() {
    const memoryInfo = this.getMemoryInfo()
    if (!memoryInfo) return

    const { usedJSHeapSize, jsHeapSizeLimit } = memoryInfo
    const memoryUsagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100
    
    let pressureLevel: MemoryPressureEvent['level'] = 'normal'
    const actions: string[] = []
    
    if (memoryUsagePercent > 90) {
      pressureLevel = 'critical'
      actions.push('Execute all cleanup tasks', 'Force GC')
      this.executeCleanupByPriority()
      this.forceGarbageCollection()
      this.triggerEmergencyCleanup()
    } else if (memoryUsagePercent > 75) {
      pressureLevel = 'moderate'
      actions.push('Execute high priority cleanup')
      this.executeCleanupByPriority('high')
      this.executeCleanupByPriority('critical')
    }
    
    if (pressureLevel !== 'normal') {
      const event: MemoryPressureEvent = {
        level: pressureLevel,
        usedMemory: usedJSHeapSize / 1024 / 1024,
        availableMemory: (jsHeapSizeLimit - usedJSHeapSize) / 1024 / 1024,
        timestamp: Date.now(),
        actions
      }
      
      this.pressureEvents.push(event)
      if (this.pressureEvents.length > 10) {
        this.pressureEvents = this.pressureEvents.slice(-10)
      }
    }
  }

  // Detect memory leaks
  private detectLeaks() {
    const currentMemory = this.getCurrentMemoryUsage()
    const memoryIncrease = currentMemory - this.baselineMemory
    
    if (memoryIncrease > 50) {
      this.reportLeak({
        id: `leak_${Date.now()}`,
        type: 'unknown',
        description: `Memory increase: ${memoryIncrease.toFixed(1)}MB`,
        size: memoryIncrease,
        timestamp: Date.now(),
        stack: new Error().stack
      })
    }
    
    this.checkDOMLeaks()
  }

  private checkDOMLeaks() {
    const nodeCount = document.querySelectorAll('*').length
    if (nodeCount > 600) {
      this.reportLeak({
        id: `dom_leak_${Date.now()}`,
        type: 'dom',
        description: `Excessive DOM nodes: ${nodeCount}`,
        size: (nodeCount - 200) * 0.001,
        timestamp: Date.now()
      })
    }
  }

  private reportLeak(leak: MemoryLeak) {
    this.leaks.push(leak)
    if (this.leaks.length > 20) {
      this.leaks = this.leaks.slice(-20)
    }
  }

  private getCurrentMemoryUsage(): number {
    const memoryInfo = this.getMemoryInfo()
    return memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0
  }

  private getMemoryInfo() {
    return typeof window !== 'undefined' && 'memory' in performance 
      ? (performance as any).memory 
      : null
  }

  private triggerEmergencyCleanup() {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (!name.includes('critical')) {
            caches.delete(name)
          }
        })
      }).catch(() => {})
    }
    
    if (window.__clearLargeObjects) {
      window.__clearLargeObjects()
    }
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.executeCleanupByPriority('low')
      this.executeCleanupByPriority('medium')
    }
  }

  private handleWindowBlur = () => {
    setTimeout(() => {
      if (document.hidden) {
        this.forceGarbageCollection()
        this.executeCleanupByPriority('low')
      }
    }, 1000)
  }

  private handleWindowFocus = () => {
    this.checkMemoryPressure()
  }

  addObserver(callback: (state: MemoryState) => void) {
    this.memoryObservers.add(callback)
  }

  removeObserver(callback: (state: MemoryState) => void) {
    this.memoryObservers.delete(callback)
  }

  private notifyObservers() {
    const state = this.getMemoryState()
    this.memoryObservers.forEach(observer => {
      try {
        observer(state)
      } catch (error) {
        console.error('Observer error:', error)
      }
    })
  }

  getMemoryState(): MemoryState {
    const memoryInfo = this.getMemoryInfo()
    
    return {
      usedJSHeapSize: memoryInfo?.usedJSHeapSize || 0,
      totalJSHeapSize: memoryInfo?.totalJSHeapSize || 0,
      jsHeapSizeLimit: memoryInfo?.jsHeapSizeLimit || 0,
      allocatedMemory: this.getCurrentMemoryUsage(),
      leakSuspects: [...this.leaks],
      activeReferences: this.cleanupTasks.size,
      cleanupTasks: this.cleanupTasks.size
    }
  }

  dispose() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
    }
    this.executeCleanupByPriority()
    this.cleanupTasks.clear()
    this.memoryObservers.clear()
  }
}

// React hook for memory management
export function useMemoryManager() {
  const managerRef = useRef<MemoryManager>()
  
  useEffect(() => {
    managerRef.current = MemoryManager.getInstance()
    managerRef.current.startMonitoring()
    
    return () => {
      if (managerRef.current) {
        managerRef.current.dispose()
      }
    }
  }, [])
  
  const registerCleanup = useCallback((
    name: string,
    cleanup: () => void,
    priority: MemoryCleanupTask['priority'] = 'medium'
  ) => {
    if (!managerRef.current) return
    
    const id = `${name}_${Date.now()}`
    managerRef.current.registerCleanup(id, name, cleanup, priority)
    return id
  }, [])
  
  return {
    registerCleanup,
    forceGarbageCollection: () => managerRef.current?.forceGarbageCollection(),
    getMemoryState: () => managerRef.current?.getMemoryState(),
    manager: managerRef.current
  }
}

export { MemoryManager, type MemoryState, type MemoryLeak, type MemoryPressureEvent }