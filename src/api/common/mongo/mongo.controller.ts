import { Collection, CollectionCreateOptions } from 'mongodb';

export interface MongoController {
  connectToMongo(): Promise<void>;
  disconnect(): Promise<void>;
  dropAll(): Promise<void>;
  getColletion(collectionName: string): Promise<Collection>;
  createColletion(collectionName: string, options?: CollectionCreateOptions): Promise<Collection>;
  status(): Promise<boolean>;
}