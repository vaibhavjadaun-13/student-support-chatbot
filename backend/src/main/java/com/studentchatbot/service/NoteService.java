package com.studentchatbot.service;

import com.studentchatbot.entity.Note;
import com.studentchatbot.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    private final String UPLOAD_DIR =
            System.getProperty("user.dir") + File.separator + "uploads";

    public Note uploadFile(MultipartFile file) throws IOException {

        System.out.println("========== NoteService Started ==========");

        System.out.println("STEP 1 : Checking Upload Directory");

        File directory = new File(UPLOAD_DIR);

        if (!directory.exists()) {

            directory.mkdirs();

            System.out.println("Directory Created");

        } else {

            System.out.println("Directory Already Exists");

        }

        System.out.println("STEP 2 : Upload Folder");
        System.out.println(directory.getAbsolutePath());

        String fileName = file.getOriginalFilename();

        String filePath = directory.getAbsolutePath()
                + File.separator
                + fileName;

        System.out.println("STEP 3 : File Name = " + fileName);
        System.out.println("STEP 4 : File Path = " + filePath);

        System.out.println("STEP 5 : Saving File");

        file.transferTo(new File(filePath));

        System.out.println("STEP 6 : File Saved Successfully");

        Note note = new Note();

        note.setFileName(fileName);
        note.setFileType(file.getContentType());
        note.setFilePath(filePath);

        System.out.println("STEP 7 : Saving Record To Database");

        Note savedNote = noteRepository.save(note);

        System.out.println("STEP 8 : Database Save Successful");

        System.out.println("========== Upload Completed ==========");

        return savedNote;

    }

}