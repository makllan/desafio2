package com.marketplace.controller;

import com.marketplace.dto.CheckoutRequestDTO;
import com.marketplace.entities.Order;
import com.marketplace.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(@RequestBody CheckoutRequestDTO checkoutRequest) {
        try {
            Order order = orderService.checkout(checkoutRequest);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build(); // Simplify error handling for now
        }
    }
}
