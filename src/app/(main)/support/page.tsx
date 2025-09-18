import { Phone, Mail, Shield, User, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Anti-Ragging and Harassment Support</CardTitle>
          <CardDescription>
            Our institution is committed to providing a safe and respectful environment for all students. If you are facing any form of ragging or harassment, please reach out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Immediate Help</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2"><Phone className="h-5 w-5"/> 24/7 Helpline</h4>
                <p className="text-lg font-bold mt-1">1-800-123-4567</p>
                <p className="text-sm text-muted-foreground">For emergencies and immediate assistance.</p>
              </div>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2"><Shield className="h-5 w-5"/> Security Desk</h4>
                <p className="text-lg font-bold mt-1">011-2345-6789</p>
                <p className="text-sm text-muted-foreground">Campus security office.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Support Staff</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground"/>
                  <div>
                    <p className="font-medium">Dr. Anjali Sharma</p>
                    <p className="text-sm text-muted-foreground">Student Counselor</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:a.sharma@example.com"><Mail className="mr-2 h-4 w-4"/> Email</a>
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground"/>
                  <div>
                    <p className="font-medium">Prof. Rajeev Mehta</p>
                    <p className="text-sm text-muted-foreground">Head of Student Affairs</p>
                  </div>
                </div>
                 <Button variant="outline" size="sm" asChild>
                  <a href="mailto:r.mehta@example.com"><Mail className="mr-2 h-4 w-4"/> Email</a>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Anonymous Reporting</h3>
             <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-muted-foreground sm:max-w-md">If you are not comfortable reporting directly, you can use our anonymous online portal to submit a complaint. All submissions are confidential.</p>
                        <Button>
                            <MessageCircle className="mr-2 h-4 w-4"/> Submit Anonymous Report
                        </Button>
                    </div>
                </CardContent>
             </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
