package in.uk.md.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import in.uk.md.model.Reservation;
import in.uk.md.service.EmailService;
import in.uk.md.service.ReservationService;

@Controller
public class BookingController {
	
    @Autowired
    private ReservationService reservationService;
    
    @Autowired
    private EmailService emailService;
	
	@GetMapping("/")
    public String showReservationForm(Model model) {
        model.addAttribute("reservation", new Reservation());
        return "index"; 
     }
	
	@PostMapping("/reservations/submit")
	public String submitReservation(@ModelAttribute Reservation reservation) {
	    // Save reservation to the database (pseudo-code)
		 reservationService.save(reservation);
	 // Send email to admin about the new reservation
        emailService.sendBookingConfirmationToAdmin(reservation.getName(), reservation.getEmail(), 
                                                    reservation.getNoOfPersons(), reservation.getBookingDate(), 
                                                    reservation.getTimeSlot());
	    // Return the same page
	    return "redirect:/?success=true";
	}

	@GetMapping("/menu")
	public String showMenu() {
		return "menu";
	}
	
	@GetMapping("/time")
	public String showTime() {
		return "time";
	}
	
	@GetMapping("/map")
	public String showMap() {
		return "map";
	}
	
}
