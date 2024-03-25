# Retreival Augmentation Generation using LlamaIndex Vectorstore

## Required packages and modules
-enviroment
 - create conda enviroment
 - set up the required keys and load.
- packages
 - `openai`
 - `llama-index`
- modules
  - `from llama_index import (VectorStoreIndex, SimpleDirectoryReader,StorageContext,load_index_from_storage)`
## Implementation
 **create a floder for the dcouments and store. from llama_inde x  `SimpleDirectoryReader` read and load the documents**
 **make a vector index using `VectorStoreIndex` and store the the vector in local folder using `StorageContext`**
 **create a index and  query engine to execute queries using `load_index_from_storage` or `storage_context.persist`**

