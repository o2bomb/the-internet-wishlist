import {
  Box,
  Button,
  chakra,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import { useReportEntryMutation } from "../../generated/graphql";
import styles from "./ReportButton.module.css";

interface ReportButtonProps {
  id: number;
}

export const ReportButton: React.FC<ReportButtonProps> = ({ id, children }) => {
  const inputFocusRef = useRef(null);
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [reportEntry] = useReportEntryMutation();

  return (
    <>
      <Popover
        initialFocusRef={inputFocusRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <chakra.button className={styles.reportbutton}>
            {children}
          </chakra.button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Formik
              initialValues={{
                reason: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await reportEntry({
                    variables: {
                      id,
                      reason: values.reason,
                    },
                  });

                  toast({
                    title: "Report sent successfuly",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });
                } catch (e) {
                  console.log(e);

                  toast({
                    title: "You must be logged in to report an entry!",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                  });
                }

                resetForm();
                onClose();
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <Box mb={2}>
                    <label>
                      Reason
                      <Input
                        onChange={(e) =>
                          setFieldValue("reason", e.target.value)
                        }
                        ref={inputFocusRef}
                        name="reason"
                      />
                    </label>
                  </Box>
                  <Button isLoading={isSubmitting} type="submit">
                    Submit report
                  </Button>
                </Form>
              )}
            </Formik>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
