import { Dataset } from '../types/engine.types';

// Simple in-memory cache
const datasetCache = new Map<string, Dataset>();

/**
 * Load dataset from JSON file or API
 */
export async function loadDataset(path: string): Promise<Dataset> {
  // Check cache first
  if (datasetCache.has(path)) {
    return datasetCache.get(path)!;
  }

  try {
    // Load from public/datasets/ folder
    const response = await fetch(`/datasets/${path}`);

    if (!response.ok) {
      throw new Error(`Failed to load dataset: ${path}`);
    }

    const dataset: Dataset = await response.json();

    // Validate dataset
    if (!validateDataset(dataset)) {
      throw new Error(`Invalid dataset format: ${path}`);
    }

    // Cache it
    datasetCache.set(path, dataset);

    return dataset;
  } catch (error) {
    console.error('Dataset load error:', error);
    throw error;
  }
}

/**
 * Validate dataset structure
 */
export function validateDataset(dataset: any): dataset is Dataset {
  return (
    dataset &&
    typeof dataset === 'object' &&
    typeof dataset.id === 'string' &&
    typeof dataset.engine === 'string' &&
    dataset.metadata &&
    dataset.config &&
    dataset.data
  );
}

/**
 * Clear dataset cache
 */
export function clearDatasetCache() {
  datasetCache.clear();
}

/**
 * Preload datasets for better performance
 */
export async function preloadDatasets(paths: string[]): Promise<void> {
  await Promise.all(paths.map((path) => loadDataset(path)));
}
