package com.nagarro.af.bookingtablesystem.controller.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nagarro.af.bookingtablesystem.dto.RestaurantDTO;
import com.nagarro.af.bookingtablesystem.exception.CorruptedFileException;
import com.nagarro.af.bookingtablesystem.exception.NotFoundException;
import com.nagarro.af.bookingtablesystem.exception.handler.ApiException;
import com.nagarro.af.bookingtablesystem.service.RestaurantService;
import com.nagarro.af.bookingtablesystem.utils.TestDataBuilder;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = RestaurantControllerImpl.class)
public class ITRestaurantController {

    private static final UUID RESTAURANT_ID = UUID.fromString(TestDataBuilder.RESTAURANT_ID);

    private static final UUID MANAGER_ID = UUID.fromString(TestDataBuilder.RESTAURANT_MANAGER_ID);

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RestaurantService restaurantService;

    @Test
    public void testSave_whenValidInput_thenReturnStatus201() throws Exception {
        RestaurantDTO restaurantDTO = buildRestaurantDTO();

        when(restaurantService.save(restaurantDTO)).thenReturn(restaurantDTO);

        mockMvc.perform(post("/restaurants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(restaurantDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value(restaurantDTO.getId().toString()))
                .andExpect(jsonPath("name").value(restaurantDTO.getName()))
                .andExpect(jsonPath("email").value(restaurantDTO.getEmail()))
                .andExpect(jsonPath("phoneNo").value(restaurantDTO.getPhoneNo()))
                .andExpect(jsonPath("country").value(restaurantDTO.getCountry()))
                .andExpect(jsonPath("city").value(restaurantDTO.getCity()))
                .andExpect(jsonPath("address").value(restaurantDTO.getAddress()))
                .andExpect(jsonPath("description").value(restaurantDTO.getDescription()))
                .andExpect(jsonPath("managerId").isEmpty())
                .andExpect(jsonPath("menu").isEmpty())
                .andExpect(jsonPath("maxCustomersNo").value(restaurantDTO.getMaxCustomersNo()))
                .andExpect(jsonPath("maxTablesNo").value(restaurantDTO.getMaxTablesNo()));
    }

    @Test
    public void testSave_whenInvalidInput_thenReturnStatus400() throws Exception {
        RestaurantDTO restaurantDTO = buildRestaurantDTO();
        restaurantDTO.setEmail(null);

        when(restaurantService.save(restaurantDTO)).thenReturn(restaurantDTO);

        MvcResult mvcResult = mockMvc.perform(post("/restaurants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(restaurantDTO)))
                .andExpect(status().isBadRequest())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.BAD_REQUEST, "Restaurant's email is mandatory!");

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    public void testFindById_whenValidId_thenReturnStatus200() throws Exception {
        RestaurantDTO restaurantDTO = buildRestaurantDTO();

        when(restaurantService.findById(restaurantDTO.getId())).thenReturn(restaurantDTO);

        mockMvc.perform(get("/restaurants/" + restaurantDTO.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(restaurantDTO.getId().toString()))
                .andExpect(jsonPath("name").value(restaurantDTO.getName()))
                .andExpect(jsonPath("email").value(restaurantDTO.getEmail()))
                .andExpect(jsonPath("phoneNo").value(restaurantDTO.getPhoneNo()))
                .andExpect(jsonPath("country").value(restaurantDTO.getCountry()))
                .andExpect(jsonPath("city").value(restaurantDTO.getCity()))
                .andExpect(jsonPath("address").value(restaurantDTO.getAddress()))
                .andExpect(jsonPath("description").value(restaurantDTO.getDescription()))
                .andExpect(jsonPath("managerId").isEmpty())
                .andExpect(jsonPath("maxCustomersNo").value(restaurantDTO.getMaxCustomersNo()))
                .andExpect(jsonPath("maxTablesNo").value(restaurantDTO.getMaxTablesNo()))
                .andExpect(jsonPath("menu").isEmpty());
    }

    @Test
    public void testFindById_whenInvalidId_thenReturnStatus400() throws Exception {
        String notFoundMessage = "Restaurant with id " + RESTAURANT_ID + " could not be found!";

        when(restaurantService.findById(RESTAURANT_ID)).thenThrow(new NotFoundException(notFoundMessage));

        MvcResult mvcResult = mockMvc.perform(get("/restaurants/" + RESTAURANT_ID))
                .andExpect(status().isNotFound())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.NOT_FOUND, notFoundMessage);

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    public void testFindByName_whenValidName_thenReturnStatus200() throws Exception {
        RestaurantDTO restaurantDTO = buildRestaurantDTO();

        when(restaurantService.findByName(restaurantDTO.getName())).thenReturn(restaurantDTO);

        mockMvc.perform(get("/restaurants/name/" + restaurantDTO.getName()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(restaurantDTO.getId().toString()))
                .andExpect(jsonPath("name").value(restaurantDTO.getName()))
                .andExpect(jsonPath("email").value(restaurantDTO.getEmail()))
                .andExpect(jsonPath("phoneNo").value(restaurantDTO.getPhoneNo()))
                .andExpect(jsonPath("country").value(restaurantDTO.getCountry()))
                .andExpect(jsonPath("city").value(restaurantDTO.getCity()))
                .andExpect(jsonPath("address").value(restaurantDTO.getAddress()))
                .andExpect(jsonPath("description").value(restaurantDTO.getDescription()))
                .andExpect(jsonPath("managerId").isEmpty())
                .andExpect(jsonPath("maxCustomersNo").value(restaurantDTO.getMaxCustomersNo()))
                .andExpect(jsonPath("maxTablesNo").value(restaurantDTO.getMaxTablesNo()))
                .andExpect(jsonPath("menu").isEmpty());
    }

    @Test
    public void testFindByName_whenInvalidName_thenReturnStatus400() throws Exception {
        String restaurantName = "Garlic";
        String notFoundMessage = "Restaurant with name " + restaurantName + " could not be found!";

        when(restaurantService.findByName(restaurantName)).thenThrow(new NotFoundException(notFoundMessage));

        MvcResult mvcResult = mockMvc.perform(get("/restaurants/name/" + restaurantName))
                .andExpect(status().isNotFound())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.NOT_FOUND, notFoundMessage);

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    public void testFindAll_returnStatus200() throws Exception {
        List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
        RestaurantDTO restaurantDTO = buildRestaurantDTO();
        restaurantDTOList.add(restaurantDTO);

        when(restaurantService.findAll()).thenReturn(restaurantDTOList);

        mockMvc.perform(get("/restaurants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(restaurantDTO.getId().toString()))
                .andExpect(jsonPath("$[0].name").value(restaurantDTO.getName()))
                .andExpect(jsonPath("$[0].email").value(restaurantDTO.getEmail()))
                .andExpect(jsonPath("$[0].phoneNo").value(restaurantDTO.getPhoneNo()))
                .andExpect(jsonPath("$[0].country").value(restaurantDTO.getCountry()))
                .andExpect(jsonPath("$[0].city").value(restaurantDTO.getCity()))
                .andExpect(jsonPath("$[0].address").value(restaurantDTO.getAddress()))
                .andExpect(jsonPath("$[0].description").value(restaurantDTO.getDescription()))
                .andExpect(jsonPath("$[0].managerId").isEmpty())
                .andExpect(jsonPath("$[0].maxCustomersNo").value(restaurantDTO.getMaxCustomersNo()))
                .andExpect(jsonPath("$[0].maxTablesNo").value(restaurantDTO.getMaxTablesNo()))
                .andExpect(jsonPath("$[0].menu").isEmpty());
    }

    @Test
    public void testFindAllByCountryAndCity_returnStatus200() throws Exception {
        List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
        RestaurantDTO restaurantDTO = buildRestaurantDTO();
        restaurantDTOList.add(restaurantDTO);

        String country = restaurantDTO.getCountry();
        String city = restaurantDTO.getCity();

        when(restaurantService.findAllByCountryAndCity(country, city)).thenReturn(restaurantDTOList);

        mockMvc.perform(get("/restaurants/country/" + country + "/city/" + city))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(restaurantDTO.getId().toString()))
                .andExpect(jsonPath("$[0].name").value(restaurantDTO.getName()))
                .andExpect(jsonPath("$[0].email").value(restaurantDTO.getEmail()))
                .andExpect(jsonPath("$[0].phoneNo").value(restaurantDTO.getPhoneNo()))
                .andExpect(jsonPath("$[0].country").value(country))
                .andExpect(jsonPath("$[0].city").value(city))
                .andExpect(jsonPath("$[0].address").value(restaurantDTO.getAddress()))
                .andExpect(jsonPath("$[0].description").value(restaurantDTO.getDescription()))
                .andExpect(jsonPath("$[0].managerId").isEmpty())
                .andExpect(jsonPath("$[0].maxCustomersNo").value(restaurantDTO.getMaxCustomersNo()))
                .andExpect(jsonPath("$[0].maxTablesNo").value(restaurantDTO.getMaxTablesNo()))
                .andExpect(jsonPath("$[0].menu").isEmpty());
    }

    @Test
    public void testDelete_whenValidId_thenReturnStatus200() throws Exception {
        mockMvc.perform(delete("/restaurants/" + RESTAURANT_ID))
                .andExpect(status().isOk());
    }

    @Test
    public void testDelete_whenInvalidId_thenReturnStatus404() throws Exception {
        String notFoundMessage = "Restaurant with id " + RESTAURANT_ID + " could not be found!";

        doThrow(new NotFoundException(notFoundMessage)).when(restaurantService).delete(RESTAURANT_ID);

        MvcResult mvcResult = mockMvc.perform(delete("/restaurants/" + RESTAURANT_ID))
                .andExpect(status().isNotFound())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.NOT_FOUND, notFoundMessage);

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    public void testAssignRestaurantManager_whenValidId_thenReturnStatus200() throws Exception {
        mockMvc.perform(put("/restaurants/" + RESTAURANT_ID + "/manager/" + MANAGER_ID))
                .andExpect(status().isOk());
    }

    @Test
    public void testAssignRestaurantManager_whenInvalidRestaurantId_thenReturnStatus404() throws Exception {
        String notFoundMessage = "Restaurant with id " + RESTAURANT_ID + " could not be found!";

        doThrow(new NotFoundException(notFoundMessage))
                .when(restaurantService).assignRestaurantManager(RESTAURANT_ID, MANAGER_ID);

        MvcResult mvcResult = mockMvc.perform(put("/restaurants/" + RESTAURANT_ID + "/manager/" + MANAGER_ID))
                .andExpect(status().isNotFound())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.NOT_FOUND, notFoundMessage);

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    public void testAssignRestaurantManager_whenInvalidManagerId_thenReturnStatus404() throws Exception {
        String notFoundMessage = "Restaurant manager with id " + MANAGER_ID + " could not be found!";

        doThrow(new NotFoundException(notFoundMessage))
                .when(restaurantService).assignRestaurantManager(RESTAURANT_ID, MANAGER_ID);

        MvcResult mvcResult = mockMvc.perform(put("/restaurants/" + RESTAURANT_ID + "/manager/" + MANAGER_ID))
                .andExpect(status().isNotFound())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.NOT_FOUND, notFoundMessage);

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    public void testUploadMenu_whenValidFile_thenReturnStatus200() throws Exception {
        MockMultipartFile menu = new MockMultipartFile(
                "menu",
                "menu.pdf",
                MediaType.MULTIPART_FORM_DATA_VALUE,
                "menu".getBytes()
        );

        doNothing().when(restaurantService).uploadMenu(RESTAURANT_ID, menu);

        mockMvc.perform(multipart("/restaurants/" + RESTAURANT_ID)
                        .file(menu)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
    }

    @Test
    public void testUploadMenu_whenInvalidFile_thenReturnStatus415() throws Exception {
        String corruptedFileMessage = "Menu file is invalid!";

        MockMultipartFile menu = new MockMultipartFile(
                "menu",
                null,
                MediaType.MULTIPART_FORM_DATA_VALUE,
                "menu".getBytes()
        );

        doThrow(new CorruptedFileException(corruptedFileMessage))
                .when(restaurantService).uploadMenu(RESTAURANT_ID, menu);

        MvcResult mvcResult = mockMvc.perform(multipart("/restaurants/" + RESTAURANT_ID)
                        .file(menu)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isUnsupportedMediaType())
                .andReturn();

        ApiException expectedException = new ApiException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, corruptedFileMessage);

        String expectedResponseBody = objectMapper.writeValueAsString(expectedException);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @NotNull
    private RestaurantDTO buildRestaurantDTO() {
        RestaurantDTO restaurantDTO = TestDataBuilder.buildRestaurantDTO();
        restaurantDTO.setId(RESTAURANT_ID);
        return restaurantDTO;
    }
}
