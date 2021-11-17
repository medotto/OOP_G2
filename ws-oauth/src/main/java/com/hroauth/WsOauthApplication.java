package com.hroauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class WsOauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsOauthApplication.class, args);
	}

}
