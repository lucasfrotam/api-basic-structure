import { Collection, FilterQuery, FindOneOptions } from 'mongodb';
import { MongoController } from '../mongo/mongo.controller';

export abstract class Repository<T> {
  private collection: Collection<T>;
  constructor(private mongo: MongoController, readonly collectionName: string) { }

  public async init(postInit?: (collection: Collection<T>) => Promise<void>): Promise<void> {
    this.collection = await this.mongo.getColletion(this.collectionName);
    if (postInit) {
      await postInit(this.collection);
    }
  }

  protected async findOne(filterQuery: FilterQuery<T>, options?: FindOneOptions): Promise<any> {
    try {
      return await this.collection.findOne(filterQuery, options);
    } catch (e) {
      console.log(e);
    }
  }

  protected async findAll(): Promise<any> {
    try {
      return await this.collection.find().toArray();
    } catch (e) {
      console.log(e);
    }
  }
}