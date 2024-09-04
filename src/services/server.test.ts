import axios from 'axios';
import { getReachableUrls, getReachableUrlsByPriority } from './server';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('URL Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls
  });

  test('should return reachable URLs sorted by priority', async () => {
    mockedAxios.get
      .mockImplementationOnce(() => Promise.reject()) 
      .mockImplementationOnce(() => Promise.resolve({ status: 200 })) 
      .mockImplementationOnce(() => Promise.resolve({ status: 500 }))
      .mockImplementationOnce(() => Promise.resolve({ status: 201 }))
      .mockImplementationOnce(() => Promise.resolve({ status: 299 }))
      .mockImplementationOnce(() => Promise.resolve({ status: 300 }));

    const result = await getReachableUrls();
    expect(result).toEqual([
      { url: 'http://app.scnt.me', priority: 3 },
      { url: 'https://gitlab.com', priority: 4 },
      { url: 'https://doesnt-work.github.com', priority: 4 },
    ]);
  });

  test('should return reachable URLs by priority', async () => {
    mockedAxios.get
      .mockImplementationOnce(() => Promise.resolve({ status: 200 }))
      .mockImplementationOnce(() => Promise.resolve({ status: 400 }))
      .mockImplementationOnce(() => Promise.reject());
    

    const result = await getReachableUrlsByPriority(4);
    
    expect(result).toEqual([
      'https://gitlab.com',
    ]);
  });

  test('should handle unreachable URLs', async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject());

    const result = await getReachableUrls();
    expect(result).toEqual([]);
  });
});