import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getVoiceNoteById, updateVoiceNoteById } from 'apiSdk/voice-notes';
import { Error } from 'components/error';
import { voiceNoteValidationSchema } from 'validationSchema/voice-notes';
import { VoiceNoteInterface } from 'interfaces/voice-note';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrderInterface } from 'interfaces/order';
import { getOrders } from 'apiSdk/orders';

function VoiceNoteEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<VoiceNoteInterface>(
    () => (id ? `/voice-notes/${id}` : null),
    () => getVoiceNoteById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: VoiceNoteInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateVoiceNoteById(id, values);
      mutate(updated);
      resetForm();
      router.push('/voice-notes');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<VoiceNoteInterface>({
    initialValues: data,
    validationSchema: voiceNoteValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Voice Note
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="audio_file" mb="4" isInvalid={!!formik.errors?.audio_file}>
              <FormLabel>Audio File</FormLabel>
              <Input type="text" name="audio_file" value={formik.values?.audio_file} onChange={formik.handleChange} />
              {formik.errors.audio_file && <FormErrorMessage>{formik.errors?.audio_file}</FormErrorMessage>}
            </FormControl>
            <FormControl id="qr_code" mb="4" isInvalid={!!formik.errors?.qr_code}>
              <FormLabel>Qr Code</FormLabel>
              <Input type="text" name="qr_code" value={formik.values?.qr_code} onChange={formik.handleChange} />
              {formik.errors.qr_code && <FormErrorMessage>{formik.errors?.qr_code}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrderInterface>
              formik={formik}
              name={'order_id'}
              label={'Select Order'}
              placeholder={'Select Order'}
              fetcher={getOrders}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.id}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'voice_note',
  operation: AccessOperationEnum.UPDATE,
})(VoiceNoteEditPage);
