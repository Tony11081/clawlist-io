# Custom Hook Implementation for State Management

Learn how to build reusable logic hooks that interface directly with the OpenClaw telemetry API for real-time monitoring components. This guide covers practical patterns for state management in OpenClaw applications.

## What You'll Learn

- Creating custom hooks for OpenClaw telemetry
- Managing real-time state updates
- Implementing efficient data subscriptions
- Building reusable monitoring components
- Performance optimization techniques

## Prerequisites

- OpenClaw 1.5+ installed
- React 18+ (if using React)
- Understanding of hooks pattern
- Basic knowledge of WebSocket or SSE

## Understanding OpenClaw Telemetry API

The telemetry API provides real-time insights into your OpenClaw instance:

```javascript
import { openclaw } from '@openclaw/sdk'

// Subscribe to telemetry events
const unsubscribe = openclaw.telemetry.subscribe({
  metrics: ['cpu', 'memory', 'tasks'],
  interval: 1000, // Update every second
  onUpdate: (data) => {
    console.log('Telemetry update:', data)
  }
})
```

## Creating a Basic Telemetry Hook

### Step 1: Define the Hook Structure

```javascript
import { useState, useEffect } from 'react'
import { openclaw } from '@openclaw/sdk'

export function useTelemetry(metrics = ['cpu', 'memory']) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let unsubscribe

    const subscribe = async () => {
      try {
        unsubscribe = await openclaw.telemetry.subscribe({
          metrics,
          interval: 1000,
          onUpdate: (telemetryData) => {
            setData(telemetryData)
            setLoading(false)
          },
          onError: (err) => {
            setError(err)
            setLoading(false)
          }
        })
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    subscribe()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [metrics.join(',')])

  return { data, loading, error }
}
```

### Step 2: Use the Hook in Components

```javascript
function SystemMonitor() {
  const { data, loading, error } = useTelemetry(['cpu', 'memory', 'tasks'])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>System Metrics</h2>
      <p>CPU: {data.cpu}%</p>
      <p>Memory: {data.memory}MB</p>
      <p>Active Tasks: {data.tasks.active}</p>
    </div>
  )
}
```

## Advanced Patterns

### 1. Selective Updates

Only update when specific thresholds are crossed:

```javascript
export function useThresholdTelemetry(metric, threshold) {
  const [exceeded, setExceeded] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const unsubscribe = openclaw.telemetry.subscribe({
      metrics: [metric],
      interval: 1000,
      onUpdate: (data) => {
        const currentValue = data[metric]
        setValue(currentValue)
        setExceeded(currentValue > threshold)
      }
    })

    return unsubscribe
  }, [metric, threshold])

  return { value, exceeded }
}
```

### 2. Historical Data Tracking

Track metrics over time:

```javascript
export function useHistoricalTelemetry(metric, windowSize = 60) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const unsubscribe = openclaw.telemetry.subscribe({
      metrics: [metric],
      interval: 1000,
      onUpdate: (data) => {
        setHistory(prev => {
          const newHistory = [...prev, {
            timestamp: Date.now(),
            value: data[metric]
          }]
          // Keep only last windowSize entries
          return newHistory.slice(-windowSize)
        })
      }
    })

    return unsubscribe
  }, [metric, windowSize])

  return history
}
```

### 3. Aggregated Metrics

Combine multiple metrics:

```javascript
export function useAggregatedMetrics(metrics) {
  const [aggregated, setAggregated] = useState({})

  useEffect(() => {
    const unsubscribe = openclaw.telemetry.subscribe({
      metrics,
      interval: 1000,
      onUpdate: (data) => {
        const avg = metrics.reduce((sum, m) => sum + data[m], 0) / metrics.length
        const max = Math.max(...metrics.map(m => data[m]))
        const min = Math.min(...metrics.map(m => data[m]))

        setAggregated({ avg, max, min, raw: data })
      }
    })

    return unsubscribe
  }, [metrics.join(',')])

  return aggregated
}
```

## Performance Optimization

### 1. Debouncing Updates

Reduce render frequency for high-frequency updates:

```javascript
import { useMemo, useCallback } from 'react'
import { debounce } from 'lodash'

export function useDebouncedTelemetry(metrics, delay = 500) {
  const [data, setData] = useState(null)

  const debouncedSetData = useMemo(
    () => debounce(setData, delay),
    [delay]
  )

  useEffect(() => {
    const unsubscribe = openclaw.telemetry.subscribe({
      metrics,
      interval: 100, // High frequency
      onUpdate: debouncedSetData
    })

    return () => {
      debouncedSetData.cancel()
      unsubscribe()
    }
  }, [metrics.join(','), debouncedSetData])

  return data
}
```

### 2. Memoization

Cache expensive calculations:

```javascript
export function useProcessedTelemetry(metrics) {
  const { data } = useTelemetry(metrics)

  const processed = useMemo(() => {
    if (!data) return null

    return {
      ...data,
      cpuPercentage: (data.cpu / 100).toFixed(2),
      memoryGB: (data.memory / 1024).toFixed(2),
      efficiency: (data.tasks.completed / data.tasks.total * 100).toFixed(1)
    }
  }, [data])

  return processed
}
```

### 3. Conditional Subscriptions

Only subscribe when needed:

```javascript
export function useConditionalTelemetry(metrics, condition) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!condition) return

    const unsubscribe = openclaw.telemetry.subscribe({
      metrics,
      interval: 1000,
      onUpdate: setData
    })

    return unsubscribe
  }, [metrics.join(','), condition])

  return data
}
```

## Real-World Example: Dashboard Component

```javascript
import { useTelemetry, useHistoricalTelemetry } from './hooks'

function Dashboard() {
  const current = useTelemetry(['cpu', 'memory', 'tasks'])
  const cpuHistory = useHistoricalTelemetry('cpu', 60)

  return (
    <div className="dashboard">
      <MetricsCard title="Current Status" data={current.data} />
      <Chart title="CPU Usage (60s)" data={cpuHistory} />
      <TaskList tasks={current.data?.tasks} />
    </div>
  )
}
```

## Testing Your Hooks

```javascript
import { renderHook, waitFor } from '@testing-library/react'
import { useTelemetry } from './useTelemetry'

describe('useTelemetry', () => {
  it('should fetch telemetry data', async () => {
    const { result } = renderHook(() => useTelemetry(['cpu']))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data.cpu).toBeGreaterThanOrEqual(0)
  })
})
```

## Best Practices

1. **Clean Up Subscriptions**: Always unsubscribe in useEffect cleanup
2. **Optimize Re-renders**: Use memoization for expensive calculations
3. **Handle Errors**: Implement proper error boundaries
4. **Type Safety**: Use TypeScript for better type checking
5. **Test Thoroughly**: Write unit tests for your hooks

## Common Pitfalls

### Memory Leaks

**Problem**: Forgetting to unsubscribe

**Solution**: Always return cleanup function

```javascript
useEffect(() => {
  const unsubscribe = openclaw.telemetry.subscribe(...)
  return unsubscribe // Don't forget this!
}, [])
```

### Stale Closures

**Problem**: Using outdated values in callbacks

**Solution**: Use useCallback with proper dependencies

```javascript
const handleUpdate = useCallback((data) => {
  // Use current state/props
}, [/* dependencies */])
```

## Next Steps

- Explore [Advanced Hook Patterns](/guides/advanced-hooks)
- Learn about [Performance Monitoring](/guides/performance-monitoring)
- Read [Testing Strategies](/guides/testing-strategies)

---

**Author**: OpenClaw Team
**Last Updated**: March 2026
**OpenClaw Version**: 1.5+
