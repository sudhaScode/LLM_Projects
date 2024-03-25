
# Indexing
 - `Load`: First we need to load our data. This is done with DocumentLoaders.
 - `Split`: Text splitters break large Documents into smaller chunks. This is useful both for indexing data and for passing it in to a model, since large chunks are harder to search over and won’t fit in a model’s finite context window.
 - `Store`: We need somewhere to store and index our splits, so that they can later be searched over. This is often done using a VectorStore and Embeddings model.

# Retrieval and generation
 - `Retrieve`: Given a user input, relevant splits are retrieved from storage using a Retriever.
 - `Generate`: A ChatModel / LLM produces an answer using a prompt that includes the question and the retrieved data

# LangChain 
Langchain is a framework for developing applications powered by language models. It enables applications that:
   - `Are context-aware`: connect a language model to sources of context (prompt instructions, few shot examples, content to ground its response in, etc.)
   - `Reason`: rely on a language model to reason (about how to answer based on provided context, what actions to take, etc.)

## This framework consists of several parts.
`LangChain Libraries`: The Python and JavaScript libraries. Contains interfaces and integrations for a myriad of components, a basic run time for combining these components into chains and agents, and off-the-shelf implementations of chains and agents.
`LangChain Templates`: A collection of easily deployable reference architectures for a wide variety of tasks.
`LangServe`: A library for deploying LangChain chains as a REST API.
`LangSmith`: A developer platform that lets you debug, test, evaluate, and monitor chains built on any LLM framework and seamlessly integrates with LangChain.


![Objective](./resources/assets/image.jpg)

# The Myth
`RAG` Retreival Augumented Generator is technique, developed by the `information retrieval(IR)`, it helps Large Language models to get context of new data to generate new content for new input without any hallucination. 
`Langchain` provides the diffrent retrieval methods to get similar embeddings realted to user prompt  from vector store [`Similarity Search`], a main prompt is genrated by combinning these embeddings context and user prompt  and it will sent to the `generative LLM`.

important link - https://python.langchain.com/docs/modules/data_connection/

*Packages and Methods involved*
- `Document loaders`
importent link - https://python.langchain.com/docs/integrations/document_loaders <br>
Document loaders load documents from many different sources. LangChain provides over 100 different document loaders as well as integrations with other major providers in the space, like AirByte and Unstructured. LangChain provides integrations to load all types of documents (HTML, PDF, code) from all types of locations (private S3 buckets, public websites).
- `Text Splitting`
importent link - https://python.langchain.com/docs/modules/data_connection/document_transformers/<br>
After loaded documents, you'll often want to transform them to better suit your application. The simplest example is you may want to split a long document into smaller chunks that can fit into your model's context window. 
When you want to deal with long pieces of text, it is necessary to split up that text into chunks. 

- `Text embedding models`
importent link - https://python.langchain.com/docs/modules/data_connection/text_embedding/<br>
Embeddings plays a key role in vector similarity seach, Embeddins is a vetor that represent any kind of data, it holds the meaning of a data chunk in the form numerical form. Embeddings are typically created using machine learning techniques, and they are often used in natural language processing (NLP) and other machine learning applications.

- `Vector stores`
importent link - https://python.langchain.com/docs/modules/data_connection/vectorstores/<br>
Collection of embeddings creates index, this could be stored in vector store.

- `indexing`
important link - https://python.langchain.com/docs/modules/data_connection/indexing<br>
The indexing API lets you load and keep in sync documents from any source into a vector store.

- `Retrievers`
important link - https://python.langchain.com/docs/modules/data_connection/retrievers/<br>
A retriever is an interface that returns documents given an unstructured query. It is more general than a vector store. A retriever does not need to be able to store documents, only to return (or retrieve) them. Vector stores can be used as the backbone of a retriever.
it is used to get the relevant information from store.

