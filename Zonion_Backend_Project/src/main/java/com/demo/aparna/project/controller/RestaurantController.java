package com.demo.aparna.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.aparna.project.model.Restaurant;
import com.demo.aparna.project.repository.RestaurantRepository;
import com.demo.aparna.project.service.RestaurantService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping({ "/data" })
public class RestaurantController {

	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private RestaurantRepository restaurantRepo;

	@PostMapping("/add")
	public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant resto) {
		System.out.println(" In post of resto :  " + resto);
		Restaurant rest = restaurantService.addResto(resto);

		return new ResponseEntity<Restaurant>(rest, HttpStatus.OK);
	}

	@GetMapping("/show/{id}")
	public Optional<Restaurant> getById(@PathVariable Long id) {
		Optional<Restaurant> rest = restaurantService.getResto(id);
		return rest;

	}

	@GetMapping("/show")
	public List<Restaurant> getAllRestaurant() {
		List<Restaurant> list = restaurantService.getAllResto();
		return list;
	}

	@DeleteMapping("/delete/{id}")
	public void deleteByRestoId(@PathVariable Long id) {
		restaurantService.deleteResto(id);
	}

	@PutMapping("/change")
	public ResponseEntity<Restaurant> updateRestoData(@RequestBody Restaurant resto) {
		Restaurant rest = restaurantService.updateResto(resto);
		return new ResponseEntity<Restaurant>(rest, HttpStatus.OK);
	}

	@PutMapping("/change/{id}")
	public ResponseEntity<Restaurant> updateRestoByI(@PathVariable(value = "id") Long id,
			@Validated @RequestBody Restaurant restoDetails) throws Exception {
		Restaurant restaurant = restaurantRepo.findById(id).orElseThrow(() -> new Exception());
		restaurant.setName(restoDetails.getName());
		restaurant.setAddress(restoDetails.getAddress());
		restaurant.setPhonenumber(restoDetails.getPhonenumber());
		restaurant.setOpentime(restoDetails.getOpentime());
		restaurant.setClosetime(restoDetails.getClosetime());
		final Restaurant updatedRestaurant = restaurantRepo.save(restaurant);
		return ResponseEntity.ok(updatedRestaurant);
	}

	// image controller

	@PutMapping("/updaterestimage/{id}")
	public String imageUpload(@RequestParam MultipartFile file, @PathVariable Long id) {
		System.out.println(" In post of File :" + file.getName() + "---" + file.getContentType() + "---"
				+ file.getOriginalFilename());
		return restaurantService.uploadImage(file, id);

	}

	@GetMapping("/{filename}/{id}")
	// @GetMapping("/file/{name}")
	public ResponseEntity<byte[]> getFileByName(@PathVariable String filename, @PathVariable Long id) {
		System.out.println("name=" + filename + "Id=" + id);
		Optional<Restaurant> fileOptional = restaurantRepo.findByNameAndId(filename, id);

		if (fileOptional.isPresent()) {
			Restaurant file = fileOptional.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
					.body(file.getPic());
		}

		return ResponseEntity.status(404).body(null);
	}
	

}
