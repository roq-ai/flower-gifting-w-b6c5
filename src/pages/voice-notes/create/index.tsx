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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVoiceNote } from 'apiSdk/voice-notes';
import { Error } from 'components/error';
import { voiceNoteValidationSchema } from 'validationSchema/voice-notes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrderInterface } from 'interfaces/order';
import { getOrders } from 'apiSdk/orders';
import { VoiceNoteInterface } from 'interfaces/voice-note';

function VoiceNoteCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VoiceNoteInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVoiceNote(values);
      resetForm();
      router.push('/voice-notes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VoiceNoteInterface>({
    initialValues: {
      audio_file: '',
      qr_code: '',
      order_id: (router.query.order_id as string) ?? null,
    },
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
            Create Voice Note
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'voice_note',
  operation: AccessOperationEnum.CREATE,
})(VoiceNoteCreatePage);
