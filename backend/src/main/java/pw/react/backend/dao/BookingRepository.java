package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pw.react.backend.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
