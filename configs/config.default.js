module.exports = {
  server: {
    port: 4000,
    timeout: '300s'
  },
  // Path of temporary directory under appRoot
  tempDirPath: "/tmp",
  langDirPath: "/lang",
  faqTemplateXml: '/en/faqTemplate.xml',
  faqTemplateCss: '/en/faqTemplate.css',

  logging: {
    file: {
      // Max size in bytes of the logfile,
      //  if the size is exceeded then a new file is created,
      //  a counter will become a suffix of the log file in decending order (largest = newest).
      maxsize: 5242880, // 5MB

      // Maxium log 10 files, remove older files if exceeded
      maxFiles: 10,

      // If true, log files will be rolled based on maxsize and maxfiles,
      //  but in ascending order (largest = oldest).
      tailable: true,

      // If true, all log files but the current one will be zipped.
      zippedArchive: true,
    },

    // Path of log directory under tempDir
    path: "/logs"
  },

  importing: {
    file: {
      maxsize: "50mb"
    }
  }
}