import { MongoClient, Db, Collection, CollectionCreateOptions } from 'mongodb';
import { MongoController } from './mongo.controller';

export class MongoService implements MongoController {
  private mongoClient: MongoClient;
  private mongoDb: Db;

  constructor(private mongoURI: string) { }

  connectToMongo = async (): Promise<void> => {
    try {
      this.mongoClient = await MongoClient.connect(this.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`connected to mongo successfully ${this.mongoURI}`);
    } catch (e) {
      console.log(`Failed to connect to mongo. ${e.message}`);
    }
    this.mongoDb = this.mongoClient.db();
  };

  createColletion = async (collectionName: string, options?: CollectionCreateOptions): Promise<Collection> => {
    return await this.mongoDb.createCollection(collectionName, options);
  };

  getColletion = async (collectionName: string): Promise<Collection> => {
    return await this.mongoDb.collection(collectionName);
  };

  dropAll = async (): Promise<void> => {
    await this.mongoDb.dropDatabase();
  };

  disconnect = async (): Promise<void> => {
    await this.mongoClient.close();
  };

  status = async (): Promise<boolean> => {
    try {
      const { ok } = await this.mongoDb.stats();
      return !!ok;
    } catch (e) {
      console.log(e);
    }
    return false;
  };
}
