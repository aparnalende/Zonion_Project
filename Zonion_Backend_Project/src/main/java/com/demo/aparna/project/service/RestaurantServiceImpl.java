package com.demo.aparna.project.service;

import java.util.Date;
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
	private RestaurantRepository restaurantRepository;

	@Override
	public Restaurant addResto(Restaurant resto) {
		Date d = new Date();
		String date = d.toString();
		resto.setLastUpdatedTime(date.substring(4));
		Restaurant saveResto = restaurantRepository.save(resto);

		return saveResto;
	}

	@Override
	public Optional<Restaurant> getResto(Long id) {
		Optional<Restaurant> getRest = restaurantRepository.findById(id);
		return getRest;
	}

	@Override
	public List<Restaurant> getAllResto() {
		List<Restaurant> list = restaurantRepository.findAll();
		return list;
	}

	@Override
	public Restaurant updateResto(Restaurant resto) {

		Date d = new Date();
		String date = d.toString();
		resto.setLastUpdatedTime(date.substring(4));
		Restaurant rest = restaurantRepository.save(resto);
		return rest;
	}

	@Override
	public void deleteResto(Long id) {
		restaurantRepository.deleteById(id);

	}

	@Override
	public String uploadImage(MultipartFile file, Long id) {

		Optional<Restaurant> restData = restaurantRepository.findById(id);
		try {
			if (restData.isPresent()) {
				Restaurant restModel = restData.get();
				restModel.setFilename(file.getOriginalFilename());
				restModel.setMimetype(file.getContentType());
				restModel.setPic(file.getBytes());

				restaurantRepository.save(restModel);

			}
			System.out.println("File uploaded successfully! -> filename = " + file.getOriginalFilename());
			return "File uploaded successfully! -> filename = " + file.getOriginalFilename();
		} catch (Exception e) {
			return "FAIL! Maybe You had uploaded the file before or the file's size > 500KB";
		}

	}
}
