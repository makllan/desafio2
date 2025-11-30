package com.marketplace.service;

import com.marketplace.dto.CartItemDTO;
import com.marketplace.dto.CheckoutRequestDTO;
import com.marketplace.entities.Order;
import com.marketplace.entities.Product;
import com.marketplace.repository.OrderRepository;
import com.marketplace.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void shouldCheckoutSuccessfully() {
        Product product = new Product(1L, "Test Product", BigDecimal.valueOf(100), 10, true);

        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setProductId(1L);
        itemDTO.setQuantity(2);

        CheckoutRequestDTO request = new CheckoutRequestDTO();
        request.setItems(Collections.singletonList(itemDTO));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order order = orderService.checkout(request);

        assertNotNull(order);
        assertEquals(BigDecimal.valueOf(200), order.getTotal());
        assertEquals(1, order.getItems().size());
        assertEquals(8, product.getStock()); // Stock should be reduced
    }

    @Test
    void shouldFailCheckoutInsufficientStock() {
        Product product = new Product(1L, "Test Product", BigDecimal.valueOf(100), 1, true);

        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setProductId(1L);
        itemDTO.setQuantity(2);

        CheckoutRequestDTO request = new CheckoutRequestDTO();
        request.setItems(Collections.singletonList(itemDTO));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        assertThrows(RuntimeException.class, () -> orderService.checkout(request));
    }
}
