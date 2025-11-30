package com.marketplace.service;

import com.marketplace.entities.Product;
import com.marketplace.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldSaveProduct() {
        Product product = new Product(null, "Test Product", BigDecimal.TEN, 10, true);
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product saved = productService.save(product);

        assertNotNull(saved);
        assertEquals("Test Product", saved.getName());
    }

    @Test
    void shouldFindProductById() {
        Product product = new Product(1L, "Test Product", BigDecimal.TEN, 10, true);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Optional<Product> found = productService.findById(1L);

        assertTrue(found.isPresent());
        assertEquals(1L, found.get().getId());
    }
}
