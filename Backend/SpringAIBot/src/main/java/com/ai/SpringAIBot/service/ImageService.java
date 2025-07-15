package com.ai.SpringAIBot.service;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    @Autowired
    OpenAiImageModel openAiImageModel;

    public ImageResponse generateImage(String prompt){
//        ImageResponse imageResponse=openAiImageModel.call(
//                new ImagePrompt(prompt);
        ImageResponse imageResponse=openAiImageModel.call(
                //adding additional parameters of ImagePrompt- quality,height etc
                new ImagePrompt(prompt, OpenAiImageOptions.builder()
                        .model("dall-e-2")
                        .N(4)
                        .height(1024)
                        .width(1024).build())
        );
        return imageResponse;
    }
}
