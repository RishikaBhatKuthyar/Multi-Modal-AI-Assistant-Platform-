package com.ai.SpringAIBot.controller;

import com.ai.SpringAIBot.service.ChatService;
import com.ai.SpringAIBot.service.ImageService;
import com.ai.SpringAIBot.service.RecipeService;
import com.ai.SpringAIBot.service.TranscriptionService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GenAIController {
    @Autowired
    ChatService chatService;

    @Autowired
    ImageService imageService;

    @Autowired
    RecipeService recipeService;
    @Autowired
    private TranscriptionService transcriptionService;



    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }

    @GetMapping("/gen-image")
    public ResponseEntity<String> generateImage(@RequestParam String prompt) {
        ImagePrompt imagePrompt = new ImagePrompt(prompt);
        ImageResponse response = imageService.generateImage(prompt);
        String imageUrl = response.getResults().get(0).getOutput().getUrl();
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/gen-images")
    public List<String> generateImages(HttpServletResponse response, @RequestParam String prompt) {
        ImageResponse imageResponse = imageService.generateImage(prompt);
        List<String> imageUrls = imageResponse.getResults()
                .stream()
                .map(result -> result.getOutput().getUrl())
                .collect(Collectors.toList());
        return imageUrls;
    }

    @GetMapping("/recipe")
    public String createRecipe(@RequestParam String ingredients,
                               @RequestParam(defaultValue = "any") String cuisine,
                               @RequestParam(defaultValue = "") String dietaryRestriction) {
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestriction);
    }

    @PostMapping("/transcribe")
        public ResponseEntity<String> transcribeAudio(@RequestParam("file") MultipartFile file) throws IOException {
            String result = transcriptionService.transcribe(file);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }



