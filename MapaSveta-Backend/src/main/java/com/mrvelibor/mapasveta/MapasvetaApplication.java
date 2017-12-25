package com.mrvelibor.mapasveta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class MapasvetaApplication {
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplateBuilder().build();
	}

	public static void main(String[] args) {
		SpringApplication.run(MapasvetaApplication.class, args);
	}
}
