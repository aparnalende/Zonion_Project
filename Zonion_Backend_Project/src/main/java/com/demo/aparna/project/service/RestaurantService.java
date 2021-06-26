package com.demo.aparna.project.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.demo.aparna.project.model.Restaurant;
@Component
public interface RestaurantService {

	public Restaurant addResto(Restaurant resto);
	public Optional<Restaurant> getResto(Long id);
	public List<Restaurant> getAllResto();
	public Restaurant updateResto(Restaurant resto);
	public void deleteResto(Long id);
	
	public String uploadImage(MultipartFile file,Long id);
}
