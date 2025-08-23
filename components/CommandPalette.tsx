'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Search,
  Home,
  FileText,
  Building2,
  Mail,
  Shield,
  FileCheck,
  Zap,
  Settings,
  Moon,
  Sun,
  Accessibility,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<any>
  action: () => void
  category: 'navigation' | 'actions' | 'settings' | 'external'
  keywords?: string[]
  shortcut?: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  // Define all available commands
  const commands = useMemo<CommandItem[]>(() => [
    // Navigation commands
    {
      id: 'home',
      title: 'Home',
      description: 'Return to the main page',
      icon: Home,
      action: () => {
        router.push('/')
        onClose()
      },
      category: 'navigation',
      keywords: ['main', 'landing', 'start'],
      shortcut: 'Ctrl+H'
    },
    {
      id: 'thesis',
      title: 'The Synarch Thesis',
      description: 'Read our foundational philosophy',
      icon: FileText,
      action: () => {
        router.push('/thesis')
        onClose()
      },
      category: 'navigation',
      keywords: ['philosophy', 'foundation', 'manifesto'],
      shortcut: 'Ctrl+T'
    },
    {
      id: 'entities',
      title: 'Our Entities',
      description: 'Explore NOEMA and FULCRUM',
      icon: Building2,
      action: () => {
        router.push('/entities')
        onClose()
      },
      category: 'navigation',
      keywords: ['noema', 'fulcrum', 'companies', 'subsidiaries'],
      shortcut: 'Ctrl+E'
    },
    {
      id: 'manifesto',
      title: 'Manifesto',
      description: 'Our vision for the future',
      icon: Zap,
      action: () => {
        router.push('/manifesto')
        onClose()
      },
      category: 'navigation',
      keywords: ['vision', 'future', 'mission'],
      shortcut: 'Ctrl+M'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with our team',
      icon: Mail,
      action: () => {
        router.push('/contact')
        onClose()
      },
      category: 'navigation',
      keywords: ['email', 'reach', 'team'],
      shortcut: 'Ctrl+C'
    },
    
    // Legal & Policy
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Our privacy commitments',
      icon: Shield,
      action: () => {
        router.push('/privacy')
        onClose()
      },
      category: 'navigation',
      keywords: ['data', 'gdpr', 'legal']
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'Legal terms of service',
      icon: FileCheck,
      action: () => {
        router.push('/terms')
        onClose()
      },
      category: 'navigation',
      keywords: ['legal', 'service', 'agreement']
    },

    // Actions
    {
      id: 'scroll-top',
      title: 'Scroll to Top',
      description: 'Jump to the top of the page',
      icon: ChevronRight,
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
      category: 'actions',
      keywords: ['top', 'beginning', 'start'],
      shortcut: 'Home'
    },
    {
      id: 'focus-mode',
      title: 'Toggle Focus Mode',
      description: 'Hide navigation for distraction-free reading',
      icon: Settings,
      action: () => {
        // This would toggle a focus mode state
        document.body.classList.toggle('focus-mode')
        onClose()
      },
      category: 'actions',
      keywords: ['focus', 'distraction', 'clean', 'minimal']
    },

    // External links
    {
      id: 'github',
      title: 'View on GitHub',
      description: 'See the source code',
      icon: ExternalLink,
      action: () => {
        window.open('https://github.com/Robbin360/synarch-landing', '_blank')
        onClose()
      },
      category: 'external',
      keywords: ['code', 'repository', 'development']
    }
  ], [router, onClose])

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands
    
    const searchTerm = search.toLowerCase()
    return commands.filter(command => {
      const matchesTitle = command.title.toLowerCase().includes(searchTerm)
      const matchesDescription = command.description?.toLowerCase().includes(searchTerm)
      const matchesKeywords = command.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      )
      
      return matchesTitle || matchesDescription || matchesKeywords
    })
  }, [commands, search])

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    
    filteredCommands.forEach(command => {
      if (!groups[command.category]) {
        groups[command.category] = []
      }
      groups[command.category].push(command)
    })
    
    return groups
  }, [filteredCommands])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Handle command shortcuts when palette is closed
      if (!isOpen && e.ctrlKey || e.metaKey) {
        const shortcutCommand = commands.find(cmd => {
          if (!cmd.shortcut) return false
          const shortcut = cmd.shortcut.toLowerCase()
          const key = e.key.toLowerCase()
          
          if (shortcut.includes('ctrl+') || shortcut.includes('cmd+')) {
            return shortcut.endsWith(key)
          }
          
          return shortcut === key
        })
        
        if (shortcutCommand) {
          e.preventDefault()
          shortcutCommand.action()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, commands])

  // Category labels
  const categoryLabels: Record<string, string> = {
    navigation: 'Navigation',
    actions: 'Actions',
    settings: 'Settings',
    external: 'External Links'
  }

  // Category icons
  const categoryIcons: Record<string, React.ComponentType<any>> = {
    navigation: Home,
    actions: Zap,
    settings: Settings,
    external: ExternalLink
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <Command className="bg-charcoal/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-luxury overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-white/10">
                <Search className="w-5 h-5 text-white/50 mr-3" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-white placeholder-white/50 border-none outline-none text-lg"
                  autoFocus
                />
                <div className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                  Esc
                </div>
              </div>

              {/* Command List */}
              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-white/50">
                  No results found.
                </Command.Empty>

                {Object.entries(groupedCommands).map(([category, categoryCommands]) => {
                  if (categoryCommands.length === 0) return null
                  
                  const CategoryIcon = categoryIcons[category]
                  
                  return (
                    <Command.Group key={category} heading={
                      <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-white/60 uppercase tracking-wider">
                        <CategoryIcon className="w-3 h-3" />
                        {categoryLabels[category]}
                      </div>
                    }>
                      {categoryCommands.map((command) => {
                        const Icon = command.icon
                        
                        return (
                          <Command.Item
                            key={command.id}
                            value={command.id}
                            onSelect={() => command.action()}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-white/10 aria-selected:bg-white/10 group"
                          >
                            <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium">
                                {command.title}
                              </div>
                              {command.description && (
                                <div className="text-sm text-white/60 truncate">
                                  {command.description}
                                </div>
                              )}
                            </div>
                            {command.shortcut && (
                              <div className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded font-mono">
                                {command.shortcut}
                              </div>
                            )}
                          </Command.Item>
                        )
                      })}
                    </Command.Group>
                  )
                })}
              </Command.List>

              {/* Footer */}
              <div className="border-t border-white/10 px-4 py-2 text-xs text-white/50">
                Use <kbd className="bg-white/10 px-1 rounded">↑</kbd>{' '}
                <kbd className="bg-white/10 px-1 rounded">↓</kbd> to navigate,{' '}
                <kbd className="bg-white/10 px-1 rounded">Enter</kbd> to select,{' '}
                <kbd className="bg-white/10 px-1 rounded">Esc</kbd> to close
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook for managing command palette state
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  // Listen for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggle])

  return {
    isOpen,
    open,
    close,
    toggle
  }
}