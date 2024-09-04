import axios from 'axios';
import { urls } from '../data';
import { UrlEntry, ReachableUrlEntry } from '../types/url';

const TIMEOUT: number = parseInt(process.env.TIMEOUT || '5000', 10);

export async function checkUrlAvailability(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url, {timeout: TIMEOUT});
    return response.status >= 200 && response.status < 300;
  } catch {
    return false;
  }
}

export async function getReachableUrls(): Promise<UrlEntry[]> {
  const results: ReachableUrlEntry[] = await Promise.all(
    urls.map(async (entry) => ({
      ...entry,
      reachable: await checkUrlAvailability(entry.url)
    }))
  );

  return results
    .filter((entry): entry is ReachableUrlEntry => entry.reachable)
    .map(({url, priority}) => {return {url, priority}})
    .sort((a, b) => a.priority - b.priority);
}

export async function getReachableUrlsByPriority(priority: number): Promise<string[]> {
  const results: ReachableUrlEntry[] = await Promise.all(
    urls
    .filter(entry => entry.priority === priority)
    .map(async (entry) => ({
      ...entry,
      reachable: await checkUrlAvailability(entry.url)
    }))
  );

  return results
    .filter((entry): entry is ReachableUrlEntry => entry.reachable)
    .map(entry => entry.url);
}