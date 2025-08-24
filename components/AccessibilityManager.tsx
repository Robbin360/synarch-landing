'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Accessibility configuration types
interface AccessibilitySettings {
  reduceMotion: boolean
  highContrast: boolean
  increasedFontSize: boolean
  focusIndicators: boolean
  screenReaderOptimizations: boolean
  keyboardNavigation: boolean
  colorBlindSupport: boolean
  dyslexiaSupport: boolean
}

interface AccessibilityAudit {
  score: number
  issues: AccessibilityIssue[]
  wcagLevel: 'A' | 'AA' | 'AAA'
  timestamp: number
}

interface AccessibilityIssue {
  id: string
  severity: 'error' | 'warning' | 'info'
  wcagRule: string
  description: string
  element?: string
  suggestion: string
  autoFixable: boolean
}

interface FocusManagement {
  currentFocusIndex: number
  focusableElements: Element[]
  trapFocus: boolean
  restoreFocus?: Element | null
}

// Accessibility Manager
class AccessibilityManager {
  private static instance: AccessibilityManager
  private settings: AccessibilitySettings = {
    reduceMotion: false,
    highContrast: false,
    increasedFontSize: false,
    focusIndicators: true,
    screenReaderOptimizations: false,
    keyboardNavigation: true,
    colorBlindSupport: false,
    dyslexiaSupport: false
  }
  
  private focusManagement: FocusManagement = {
    currentFocusIndex: -1,
    focusableElements: [],
    trapFocus: false,
    restoreFocus: null
  }
  
  private announcer: HTMLElement | null = null
  private observers: Set<(settings: AccessibilitySettings) => void> = new Set()

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager()
    }
    return AccessibilityManager.instance
  }

  // Initialize accessibility features
  initialize() {
    this.detectUserPreferences()
    this.createLiveRegion()
    this.setupKeyboardNavigation()
    this.setupFocusManagement()
    this.applyAccessibilityEnhancements()
    
    if (process.env.NODE_ENV === 'development') {
      this.runAccessibilityAudit()
    }
  }

  // Detect user preferences from system and local storage
  private detectUserPreferences() {
    if (typeof window === 'undefined') return

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.settings.reduceMotion = prefersReducedMotion.matches
    
    prefersReducedMotion.addEventListener('change', (e) => {
      this.updateSetting('reduceMotion', e.matches)
    })

    // Detect prefers-contrast
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)')
    this.settings.highContrast = prefersHighContrast.matches
    
    prefersHighContrast.addEventListener('change', (e) => {
      this.updateSetting('highContrast', e.matches)
    })

    // Load saved preferences
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        this.settings = { ...this.settings, ...parsed }
      } catch (error) {
        console.warn('Failed to parse accessibility settings:', error)
      }
    }
  }

  // Create live region for screen reader announcements
  private createLiveRegion() {
    if (this.announcer) return

    this.announcer = document.createElement('div')
    this.announcer.setAttribute('aria-live', 'polite')
    this.announcer.setAttribute('aria-atomic', 'true')
    this.announcer.setAttribute('class', 'sr-only')
    this.announcer.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `
    
    document.body.appendChild(this.announcer)
  }

  // Announce message to screen readers
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.announcer) this.createLiveRegion()
    if (!this.announcer) return

    this.announcer.setAttribute('aria-live', priority)
    this.announcer.textContent = message

    // Clear after announcement
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = ''
      }
    }, 1000)
  }

  // Setup keyboard navigation
  private setupKeyboardNavigation() {
    document.addEventListener('keydown', this.handleKeyboardNavigation)
    document.addEventListener('focusin', this.handleFocusIn)
    document.addEventListener('focusout', this.handleFocusOut)
  }

  private handleKeyboardNavigation = (event: KeyboardEvent) => {
    if (!this.settings.keyboardNavigation) return

    // Skip links navigation (Ctrl/Cmd + /)
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault()
      this.showSkipLinks()
      return
    }

    // Focus trap handling
    if (this.focusManagement.trapFocus) {
      this.handleFocusTrap(event)
    }

    // Global keyboard shortcuts
    this.handleGlobalShortcuts(event)
  }

  private handleFocusIn = (event: FocusEvent) => {
    const target = event.target as Element
    
    // Update focus management
    const focusableElements = this.getFocusableElements()
    this.focusManagement.currentFocusIndex = focusableElements.indexOf(target)
    
    // Enhance focus indicators
    if (this.settings.focusIndicators) {
      this.enhanceFocusIndicator(target)
    }
    
    // Screen reader optimizations
    if (this.settings.screenReaderOptimizations) {
      this.optimizeForScreenReader(target)
    }
  }

  private handleFocusOut = (event: FocusEvent) => {
    const target = event.target as Element
    this.removeFocusEnhancements(target)
  }

  // Handle focus trap for modals/dialogs
  private handleFocusTrap(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    const focusableElements = this.getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        ;(lastElement as HTMLElement).focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        ;(firstElement as HTMLElement).focus()
      }
    }
  }

  // Handle global keyboard shortcuts
  private handleGlobalShortcuts(event: KeyboardEvent) {
    // Alt + H: Go to main heading
    if (event.altKey && event.key === 'h') {
      event.preventDefault()
      const mainHeading = document.querySelector('h1')
      if (mainHeading) {
        ;(mainHeading as HTMLElement).focus()
        this.announce('Navigated to main heading')
      }
    }

    // Alt + M: Go to main content
    if (event.altKey && event.key === 'm') {
      event.preventDefault()
      const mainContent = document.querySelector('main, [role="main"]')
      if (mainContent) {
        ;(mainContent as HTMLElement).focus()
        this.announce('Navigated to main content')
      }
    }

    // Alt + N: Go to navigation
    if (event.altKey && event.key === 'n') {
      event.preventDefault()
      const navigation = document.querySelector('nav, [role="navigation"]')
      if (navigation) {
        ;(navigation as HTMLElement).focus()
        this.announce('Navigated to navigation')
      }
    }
  }

  // Get all focusable elements
  private getFocusableElements(): Element[] {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ')

    return Array.from(document.querySelectorAll(selectors))
      .filter(el => {
        const style = window.getComputedStyle(el)
        return style.display !== 'none' && style.visibility !== 'hidden'
      })
  }

  // Show skip links
  private showSkipLinks() {
    const skipLinks = document.querySelector('.skip-links')
    if (skipLinks) {
      ;(skipLinks as HTMLElement).focus()
      this.announce('Skip links menu activated')
    }
  }

  // Enhance focus indicator
  private enhanceFocusIndicator(element: Element) {
    element.setAttribute('data-a11y-enhanced-focus', 'true')
    
    // Add temporary high-visibility focus styles
    const style = document.createElement('style')
    style.id = 'a11y-enhanced-focus'
    style.textContent = `
      [data-a11y-enhanced-focus="true"] {
        outline: 3px solid #007acc !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.3) !important;
      }
    `
    
    if (!document.getElementById('a11y-enhanced-focus')) {
      document.head.appendChild(style)
    }
  }

  private removeFocusEnhancements(element: Element) {
    element.removeAttribute('data-a11y-enhanced-focus')
  }

  // Optimize element for screen readers
  private optimizeForScreenReader(element: Element) {
    // Add descriptive labels if missing
    if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
      const text = element.textContent?.trim()
      if (text && text.length < 100) {
        element.setAttribute('aria-label', text)
      }
    }

    // Announce element type and state
    const role = element.getAttribute('role') || element.tagName.toLowerCase()
    const disabled = element.hasAttribute('disabled')
    const expanded = element.getAttribute('aria-expanded')
    
    let announcement = `${role}`
    if (disabled) announcement += ', disabled'
    if (expanded === 'true') announcement += ', expanded'
    if (expanded === 'false') announcement += ', collapsed'
    
    // Don't announce too frequently
    if (!element.hasAttribute('data-a11y-announced')) {
      element.setAttribute('data-a11y-announced', 'true')
      setTimeout(() => {
        element.removeAttribute('data-a11y-announced')
      }, 2000)
    }
  }

  // Update accessibility setting
  updateSetting(key: keyof AccessibilitySettings, value: boolean) {
    this.settings[key] = value
    this.saveSettings()
    this.applyAccessibilityEnhancements()
    this.notifyObservers()
    
    this.announce(`${key} ${value ? 'enabled' : 'disabled'}`)
  }

  // Save settings to localStorage
  private saveSettings() {
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(this.settings))
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error)
    }
  }

  // Apply accessibility enhancements based on settings
  private applyAccessibilityEnhancements() {
    document.documentElement.classList.toggle('reduce-motion', this.settings.reduceMotion)
    document.documentElement.classList.toggle('high-contrast', this.settings.highContrast)
    document.documentElement.classList.toggle('increased-font-size', this.settings.increasedFontSize)
    document.documentElement.classList.toggle('dyslexia-support', this.settings.dyslexiaSupport)
    document.documentElement.classList.toggle('colorblind-support', this.settings.colorBlindSupport)
    
    // Apply CSS custom properties for dynamic theming
    document.documentElement.style.setProperty(
      '--motion-scale', 
      this.settings.reduceMotion ? '0' : '1'
    )
    
    document.documentElement.style.setProperty(
      '--font-scale', 
      this.settings.increasedFontSize ? '1.2' : '1'
    )
  }

  // Enable focus trap (for modals, dialogs)
  enableFocusTrap(container?: Element) {
    this.focusManagement.trapFocus = true
    this.focusManagement.restoreFocus = document.activeElement as Element
    
    if (container) {
      const focusableElements = Array.from(
        container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      )
      this.focusManagement.focusableElements = focusableElements
      
      // Focus first element
      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }
    }
  }

  // Disable focus trap
  disableFocusTrap() {
    this.focusManagement.trapFocus = false
    
    // Restore previous focus
    if (this.focusManagement.restoreFocus) {
      ;(this.focusManagement.restoreFocus as HTMLElement).focus()
      this.focusManagement.restoreFocus = null
    }
  }

  // Run accessibility audit (development only)
  private runAccessibilityAudit(): AccessibilityAudit {
    const issues: AccessibilityIssue[] = []
    
    // Check for missing alt text
    document.querySelectorAll('img').forEach((img, index) => {
      if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
        issues.push({
          id: `img-alt-${index}`,
          severity: 'error',
          wcagRule: '1.1.1',
          description: 'Image missing alternative text',
          element: img.outerHTML.substring(0, 100),
          suggestion: 'Add descriptive alt attribute or aria-label',
          autoFixable: false
        })
      }
    })

    // Check for heading hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    let lastLevel = 0
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      if (level > lastLevel + 1) {
        issues.push({
          id: `heading-hierarchy-${index}`,
          severity: 'warning',
          wcagRule: '1.3.1',
          description: 'Heading hierarchy skipped',
          element: heading.outerHTML.substring(0, 100),
          suggestion: 'Ensure heading levels are sequential',
          autoFixable: false
        })
      }
      lastLevel = level
    })

    // Check for form labels
    document.querySelectorAll('input, select, textarea').forEach((input, index) => {
      const id = input.getAttribute('id')
      const hasLabel = id && document.querySelector(`label[for="${id}"]`)
      const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby')
      
      if (!hasLabel && !hasAriaLabel) {
        issues.push({
          id: `form-label-${index}`,
          severity: 'error',
          wcagRule: '3.3.2',
          description: 'Form control missing label',
          element: input.outerHTML.substring(0, 100),
          suggestion: 'Add associated label or aria-label',
          autoFixable: false
        })
      }
    })

    // Calculate score and WCAG level
    const totalChecks = headings.length + document.querySelectorAll('img, input, select, textarea').length
    const errorCount = issues.filter(i => i.severity === 'error').length
    const score = Math.max(0, ((totalChecks - errorCount) / totalChecks) * 100)
    
    let wcagLevel: AccessibilityAudit['wcagLevel'] = 'AAA'
    if (errorCount > 0) wcagLevel = 'AA'
    if (errorCount > totalChecks * 0.1) wcagLevel = 'A'

    const audit: AccessibilityAudit = {
      score: Math.round(score),
      issues,
      wcagLevel,
      timestamp: Date.now()
    }

    console.log('Accessibility Audit:', audit)
    return audit
  }

  // Observer pattern
  addObserver(callback: (settings: AccessibilitySettings) => void) {
    this.observers.add(callback)
  }

  removeObserver(callback: (settings: AccessibilitySettings) => void) {
    this.observers.delete(callback)
  }

  private notifyObservers() {
    this.observers.forEach(observer => {
      try {
        observer(this.settings)
      } catch (error) {
        console.error('Accessibility observer error:', error)
      }
    })
  }

  // Get current settings
  getSettings(): AccessibilitySettings {
    return { ...this.settings }
  }

  // Dispose
  dispose() {
    document.removeEventListener('keydown', this.handleKeyboardNavigation)
    document.removeEventListener('focusin', this.handleFocusIn)
    document.removeEventListener('focusout', this.handleFocusOut)
    
    if (this.announcer) {
      document.body.removeChild(this.announcer)
      this.announcer = null
    }
    
    this.observers.clear()
  }
}

// React hook for accessibility
export function useAccessibility() {
  const managerRef = useRef<AccessibilityManager>()
  const [settings, setSettings] = useState<AccessibilitySettings>({
    reduceMotion: false,
    highContrast: false,
    increasedFontSize: false,
    focusIndicators: true,
    screenReaderOptimizations: false,
    keyboardNavigation: true,
    colorBlindSupport: false,
    dyslexiaSupport: false
  })

  useEffect(() => {
    managerRef.current = AccessibilityManager.getInstance()
    managerRef.current.initialize()
    
    const updateSettings = (newSettings: AccessibilitySettings) => {
      setSettings(newSettings)
    }
    
    managerRef.current.addObserver(updateSettings)
    setSettings(managerRef.current.getSettings())
    
    return () => {
      if (managerRef.current) {
        managerRef.current.removeObserver(updateSettings)
        managerRef.current.dispose()
      }
    }
  }, [])

  const updateSetting = useCallback((key: keyof AccessibilitySettings, value: boolean) => {
    if (managerRef.current) {
      managerRef.current.updateSetting(key, value)
    }
  }, [])

  const announce = useCallback((message: string, priority?: 'polite' | 'assertive') => {
    if (managerRef.current) {
      managerRef.current.announce(message, priority)
    }
  }, [])

  const enableFocusTrap = useCallback((container?: Element) => {
    if (managerRef.current) {
      managerRef.current.enableFocusTrap(container)
    }
  }, [])

  const disableFocusTrap = useCallback(() => {
    if (managerRef.current) {
      managerRef.current.disableFocusTrap()
    }
  }, [])

  return {
    settings,
    updateSetting,
    announce,
    enableFocusTrap,
    disableFocusTrap,
    manager: managerRef.current
  }
}

export { AccessibilityManager, type AccessibilitySettings, type AccessibilityAudit }