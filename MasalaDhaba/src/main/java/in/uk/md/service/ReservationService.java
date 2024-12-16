package in.uk.md.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.uk.md.model.Reservation;
import in.uk.md.repository.ReservationRepository;

@Service
public class ReservationService {

	@Autowired
	ReservationRepository reservationRepository;

	// Method to save the reservation to the database
	public void save(Reservation reservation) {
		// Save reservation to the database using the repository
		reservationRepository.save(reservation);
	}

}
