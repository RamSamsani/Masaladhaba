package in.uk.md.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.uk.md.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
