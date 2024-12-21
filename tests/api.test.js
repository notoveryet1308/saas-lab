import { expect, describe, it, vi, beforeEach } from 'vitest'
import { getAssignmentData } from '../src/api'

describe('getAssignmentData', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('should fetch and return data successfully', async () => {
    const mockData = [{ id: 1, name: 'Test' }]
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData)
    })

    const result = await getAssignmentData()
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should return empty array when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    const result = await getAssignmentData()
    expect(result).toEqual([])
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should call the correct URL', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([])
    })

    await getAssignmentData()
    expect(fetch).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
    )
  })
})