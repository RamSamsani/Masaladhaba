package in.uk.md.model;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Reservation {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    private String email;
	    private int noOfPersons;
	    private String bookingDate;
	    private String mealType;
	    private String timeSlot;
	    private String message;
}
