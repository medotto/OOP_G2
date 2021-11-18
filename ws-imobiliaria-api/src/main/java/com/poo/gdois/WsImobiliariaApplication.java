package com.poo.gdois;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WsImobiliariaApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsImobiliariaApplication.class, args);
	}

}
