package com.gympro.controller;

import com.gympro.dto.PlanDto;
import com.gympro.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired
    private PlanService planService;

    @GetMapping
    public List<PlanDto> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/{id}")
    public PlanDto getPlanById(@PathVariable Long id) {
        return planService.getPlanById(id);
    }
}
