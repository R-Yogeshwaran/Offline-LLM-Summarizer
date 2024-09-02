import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BartTokenizer, BartForConditionalGeneration
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app)  

model = BartForConditionalGeneration.from_pretrained('sshleifer/distilbart-cnn-12-6')
tokenizer = BartTokenizer.from_pretrained('sshleifer/distilbart-cnn-12-6')

#//////////////////////////////////// text summarize /////////////////////////////////////////

@app.route('/textsummarize', methods=['POST'])
def summarize_text():
    data = request.get_json()  
    user_text = data.get('user_text', '')
    print(user_text)
    inputs = tokenizer(user_text, truncation=True, return_tensors='pt')
    summary_ids = model.generate(inputs['input_ids'], num_beams=4, early_stopping=True, min_length=100, max_length=500)
    summarized_text = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True) for g in summary_ids]

    return jsonify({'summarized_text': summarized_text[0]})

#//////////////////////////////////// Grammar Check ///////////////////////////////////////////

import language_tool_python

@app.route('/grammercheck',methods=['POST'])
def grammer_check():
    data = request.get_json()
    user_text = data.get('user_text', '')
    # print(user_text)
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(user_text)

    # for match in matches:
    #     print(match)

    # Correct the text
    corrected_text = tool.correct(user_text)
    print(corrected_text)

    return jsonify({'grammer_check':corrected_text})


#//////////////////////////////////// text file summarization  ///////////////////////////////////////////
@app.route('/upload',methods=['POST'])
def txt_file():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == '':
        return 'No selected file'

    if file:
        # Read the content of the uploaded file
        
        import nltk


        nltk.download()

        FileContent = file.read().strip()


        print(len(FileContent) )


        checkpoint = "sshleifer/distilbart-cnn-12-6"

        tokenizer = AutoTokenizer.from_pretrained(checkpoint)
        model = AutoModelForSeq2SeqLM.from_pretrained(checkpoint)
        sentences = nltk.tokenize.sent_tokenize(FileContent)
        print("sentence " )
        print(sentences)

        #intialize

        length = 0
        chunk = ""
        chunks = []
        count = -1
        for sentence in sentences:
            count += 1
        combined_length = len(tokenizer.tokenize(sentence)) + length 

        if combined_length  <= tokenizer.max_len_single_sentence: 
            chunk += sentence + " " 
            length = combined_length

            if count == len(sentences) - 1:
                chunks.append(chunk.strip())
            
        else: 
            chunks.append(chunk.strip()) 
            
            length = 0 
            chunk = ""

            chunk += sentence + " "
            length = len(tokenizer.tokenize(sentence))
        len(chunks)


        # inputs 
        inputs = [tokenizer(chunk, return_tensors="pt") for chunk in chunks]
        output=""
        print("input  : ")
        print(inputs)
        for input in inputs:
            output = model.generate(**input)
        output=output+tokenizer.decode(*output, skip_special_tokens=True)
        # print(tokenizer.decode(*output, skip_special_tokens=True))
            
        print(output)

        return jsonify({'txtoutput':output})

if __name__ == '__main__':
    app.run()
