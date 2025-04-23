
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PersonalDetailsFormProps {
  formData: {
    firstName: string;
    lastName: string;
    identityNumber?: string;
    mobile?: string;
    telephone?: string;
    email?: string;
    physicalAddress?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalDetailsForm = ({ formData, onChange }: PersonalDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          placeholder="Enter your first name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          placeholder="Enter your last name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="identityNumber">Identity Number</Label>
        <Input
          id="identityNumber"
          name="identityNumber"
          value={formData.identityNumber}
          onChange={onChange}
          placeholder="Enter your ID number"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile</Label>
        <Input
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={onChange}
          placeholder="Enter your mobile number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephone">Telephone</Label>
        <Input
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={onChange}
          placeholder="Enter your telephone number"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter your email address"
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="physicalAddress">Physical Address</Label>
        <Input
          id="physicalAddress"
          name="physicalAddress"
          value={formData.physicalAddress}
          onChange={onChange}
          placeholder="Enter your physical address"
        />
      </div>
    </div>
  );
};
