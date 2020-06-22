import { DataRepository } from './data.repository';
import { Item } from '../../common/model/item.model'

export class DataService {
  constructor(private dataRepository: DataRepository) { }

  findItemById = async (id: string): Promise<Item> => {
    const item = await this.dataRepository.findItemById(id);
    return item;
  }

  getAllData = async (): Promise<Item[]> => {
    const data = await this.dataRepository.getAllData();
    return data;
  }
}