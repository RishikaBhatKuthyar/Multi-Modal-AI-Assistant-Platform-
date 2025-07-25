package com.ai.SpringAIBot.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    ChatModel chatModel;

    public String getResponse(String prompt){
        return chatModel.call(prompt);
    }
    public String getResponseOptions(String prompt){
        ChatResponse response= chatModel.call(new Prompt(prompt, OpenAiChatOptions.builder().model("gpt-4o").build()
        ));
         return response.getResult().getOutput().getText();
    }
}
