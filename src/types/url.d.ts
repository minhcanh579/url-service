export interface UrlEntry {
    url: string;
    priority: number;
}
  
export interface ReachableUrlEntry extends UrlEntry {
    reachable: boolean;
}