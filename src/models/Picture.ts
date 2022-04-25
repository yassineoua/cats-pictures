import { Model } from 'objection';

export default class Picture extends Model {
  static get tableName() {
    return 'pictures';
  }
}
