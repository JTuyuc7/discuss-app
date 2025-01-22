import { Button } from '@nextui-org/button'
interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  formType?: string;
  primaryColor?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined
}

export default function FormButton({ children, isLoading, primaryColor }: FormButtonProps) {
  return (
    <Button
      isLoading={isLoading}
      color={primaryColor}
      type="submit"
    >
      {children}
    </Button>
  )
}
