package com.jackbox.online.jackbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@SpringBootApplication
public class JackboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(JackboxApplication.class, args);

	}
}
