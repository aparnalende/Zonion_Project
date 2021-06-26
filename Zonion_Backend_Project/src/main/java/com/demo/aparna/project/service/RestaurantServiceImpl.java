package com.demo.aparna.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.demo.aparna.project.model.Restaurant;
import com.demo.aparna.project.repository.RestaurantRepository;

@Service
public class RestaurantServiceImpl implements RestaurantService {

	@Autowired
	private RestaurantRepository restaurantReposotory;

	@Override
	public Restaurant addResto(Restaurant resto) {
		Restaurant saveResto = restaurantReposotory.save(resto);
		return saveResto;
	}

	@Override
	public Optional<Restaurant> getResto(Long id) {
		Optional<Restaurant> getRest = restaurantReposotory.findById(id);
		return getRest;
	}

	@Override
	public List<Restaurant> getAllResto() {
		List<Restaurant> list = restaurantReposotory.findAll();
		return list;
	}

	@Override
	public Restaurant updateResto(Restaurant resto) {
		Restaurant rest = restaurantReposotory.save(resto);
		return rest;
	}

	@Override
	public void deleteResto(Long id) {
		restaurantReposotory.deleteById(id);

	}

	@Override
	public String uploadImage(MultipartFile file, Long id) {

		Optional<Restaurant> restData = restaurantReposotory.findById(id);
		try {
			if (restData.isPresent()) {
				Restaurant restModel = restData.get();
				restModel.setName(file.getOriginalFilename());
				restModel.setMimetype(file.getContentType());
				restModel.setPic(file.getBytes());

				restaurantReposotory.save(restModel);

			}
			System.out.println("File uploaded successfully! -> filename = " + file.getOriginalFilename());
			return "File uploaded successfully! -> filename = " + file.getOriginalFilename();
		} catch (Exception e) {
			return "FAIL! Maybe You had uploaded the file before or the file's size > 500KB";
		}

	}
}
