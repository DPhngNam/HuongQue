package com.huongque.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderMessage {
    private String orderId;
    private String userId;
    private String amount;
    private String currency;
}
    