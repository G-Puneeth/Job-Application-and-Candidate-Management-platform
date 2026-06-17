package com.hirelix.hirelix_backend.fileupload;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @PostMapping("/upload")
    public String uploadFile(
            @RequestParam("file") MultipartFile file) {

        try {

           String uploadDir = System.getProperty("user.dir")
        + File.separator
        + "uploads";
            File directory = new File(uploadDir);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String filePath =
                    uploadDir + File.separator
                            + file.getOriginalFilename();

            File destinationFile =
                    new File(filePath);

            file.transferTo(destinationFile);

            return "/api/files/"
                    + UriUtils.encodePathSegment(
                            file.getOriginalFilename(),
                            StandardCharsets.UTF_8);

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR: " + e.getMessage();
        }
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable String fileName) {

        try {

            Path filePath =
                    Paths.get(
                            System.getProperty("user.dir"),
                            "uploads",
                            fileName);

            Resource resource =
                    new UrlResource(
                            filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity
                    .ok()
                    .header(
                            "Content-Disposition",
                            "attachment; filename=\""
                                    + resource.getFilename()
                                    + "\"")
                    .body(resource);

        } catch (Exception error) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }
}
