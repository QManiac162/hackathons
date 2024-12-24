# Disease Surveillance QA System
This project implements a **Retrieval-Augmented Generation (RAG)** pipeline for enhancing Question-Answering (QA) systems using large language models (LLMs). It leverages a combination of **pre-trained transformer models**, **retrieval mechanisms**, and **evaluation metrics** to process, retrieve, and evaluate responses for specific queries effectively. The implementation focuses on domains such as disease surveillance and outbreak investigation.

## Features
- **Retrieval-Augmented Generation**:
  - Uses a FAISS-based vector store to perform similarity-based document retrieval.
  - Integrates retrieval results with an LLM to generate tailored responses.
- **Metrics Evaluation**:
  - Employs BLEU and ROUGE metrics to evaluate the accuracy and fluency of generated responses.
- **Custom QA Framework**:
  - Utilizes LangChain for constructing the QA pipeline.
  - Fine-tunes generation using custom parameters such as temperature, token length, and repetition penalties.

---

## Technologies Used
### Core Libraries
- **Hugging Face Transformers**:
  - Llama-2 model for generation tasks.
  - Hugging Face pipeline for streamlined integration.
- **LangChain**:
  - Modular chains for text retrieval, embedding creation, and generation.
  - Tools for prompt engineering and document splitting.
- **FAISS**:
  - Used for similarity search in document retrieval tasks.
  
### Supporting Tools
- **Evaluation Metrics**:
  - BLEU: Measures fluency and overlap between predicted and reference text.
  - ROUGE: Evaluates the overlap of n-grams between the model's response and ground truth.
- **Data Handling**:
  - `pandas` for structured data processing.
  - `CSVLoader` and `UnstructuredExcelLoader` for input file management.

---

## Model Training
### Data Processing
- **Input Data**: 
  - Training and testing datasets are loaded using `CSVLoader`.
  - Questions and responses are split for QA modeling.
- **Vectorization**:
  - Documents are embedded using Hugging Face embeddings for similarity search.
  - Recursive splitting ensures efficient chunking of large documents.

### Fine-tuning and Generation
- A pipeline was built using LangChain and Hugging Face to:
  - Retrieve relevant context from FAISS.
  - Generate accurate answers using the Llama-2 model.
- Fine-tuning generation parameters:
  - `max_new_tokens`: 60
  - `temperature`: 0.01 (for controlled creativity)
  - `repetition_penalty`: 1.1 (to avoid redundant outputs)

---

## Evaluations
### Metrics Used
- **ROUGE (1, 2, L)**:
  - Evaluates precision, recall, and F-measure for text similarity.
- **BLEU**:
  - Scores based on overlapping n-grams.

### Performance Analysis
- Custom functions calculate metrics across multiple test examples.
- Responses are assessed for their alignment with ground-truth answers from the dataset.
- Averages of BLEU and ROUGE scores provide a robust evaluation.

### Results
- Example Queries and Responses from the RAG system:
  | **Query**                                                                 | **Generated Response**                                                                                                                       |
  |---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
  | Compare laboratory methods for Chikungunya and diabetes.                 | Serological tests and PCR confirm Chikungunya; diabetes uses blood glucose measurements.                                                    |
  | How do risk assessment responsibilities differ at national and district? | National: decision-making and resource allocation. District: local implementation and reporting.                                            |

---

## How to Run
1. **Install Dependencies**:
   ```bash
   pip install transformers langchain faiss-gpu rouge-score nltk
   ```
2. **Prepare Input Data**:
   - Place the CSV/Excel files in the `./Data/` directory.
   - Ensure proper formatting (columns for questions and responses).
3. **Run the Notebook**:
   - Open the Jupyter Notebook `main.ipynb`.
   - Execute cells sequentially to preprocess, train, and evaluate.
4. **Evaluate Performance**:
   - Compare metrics output to assess model quality.

---

## Future Work
- Expand dataset for broader domain adaptability.
- Incorporate additional evaluation metrics like METEOR.
- Optimize embedding generation for faster retrieval.

---

## References
- Hugging Face Llama-2: [Hugging Face](https://huggingface.co/)
- LangChain Documentation: [LangChain](https://langchain.com/)
