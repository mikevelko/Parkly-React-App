package pw.react.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pw.react.backend.model.Booking;
import pw.react.backend.model.ParkingSpot;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Page<Booking> findByStartDateTimeGreaterThanEqualAndEndDateTimeLessThanEqual(
            LocalDateTime start,
            LocalDateTime end,
            Pageable pageable);
}
