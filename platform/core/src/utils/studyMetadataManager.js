import { TypeSafeCollection } from '../classes/TypeSafeCollection';
import { StudyMetadata } from '../classes';
import OHIFError from '../classes/OHIFError.js';

const studyMetadataList = new TypeSafeCollection();

function add(studyMetadata) {
  if (!(studyMetadata instanceof StudyMetadata)) {
    console.log(
      'studyMetadataManager::studyMetada is not instance of StudyMetadata');
    /*
  throw new OHIFError(
    'studyMetadataManager::studyMetada is not instance of StudyMetadata'
  );
  */
  } else {
    studyMetadataList.insert(studyMetadata);
  }
}

function get(studyInstanceUID) {
  return studyMetadataList.findBy({ studyInstanceUID });
}

function all(options) {
  return studyMetadataList.all(options);
}

function remove(studyInstanceUID) {
  studyMetadataList.remove({ studyInstanceUID });
}

function purge() {
  studyMetadataList.removeAll();
}

export default {
  add,
  get,
  all,
  remove,
  purge,
};
