package com.marketplace.dto;

import java.util.List;

public class CheckoutRequestDTO {
    private List<CartItemDTO> items;

    public CheckoutRequestDTO() {
    }

    public CheckoutRequestDTO(List<CartItemDTO> items) {
        this.items = items;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}
