import { MongoController } from '../../common/mongo';
import { Repository } from '../../common/repository/repository';
import { Item } from '../../common/model/item.model';

export class DataRepository extends Repository<Item> {
  constructor(mongo: MongoController) {
    super(mongo, 'test-collection');
  }

  findItemById = async (id: string): Promise<Item> => {
    const item = await this.findOne({ _id: id });
    return item;
  }

  getAllData = async (): Promise<Item[]> => {
    const data = await this.findAll();
    return data.toArray();
  }
}
