import * as cdk from "@aws-cdk/core";
import * as iam from '@aws-cdk/aws-iam';

export const ssmRole = (stack: cdk.Stack, name: string): iam.Role => {
  const role = new iam.Role(stack, 'ssm', { 
  assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
  });

  role.addToPolicy(new iam.PolicyStatement({
    resources: ["*"],
    actions: [
      "ssm:DescribeAssociation",
      "ssm:GetDeployablePatchSnapshotForInstance",
      "ssm:GetDocument",
      "ssm:DescribeDocument",
      "ssm:GetManifest",
      "ssm:GetParameter",
      "ssm:GetParameters",
      "ssm:ListAssociations",
      "ssm:ListInstanceAssociations",
      "ssm:PutInventory",
      "ssm:PutComplianceItems",
      "ssm:PutConfigurePackageResult",
      "ssm:UpdateAssociationStatus",
      "ssm:UpdateInstanceAssociationStatus",
      "ssm:UpdateInstanceInformation"
    ]
  }));
  role.addToPolicy(new iam.PolicyStatement({
    resources: ["*"],
    actions: [
      "ssmmessages:CreateControlChannel",
      "ssmmessages:CreateDataChannel",
      "ssmmessages:OpenControlChannel",
      "ssmmessages:OpenDataChannel"
    ]
  }));
  role.addToPolicy(new iam.PolicyStatement({
    resources: ["*"],
    actions: [
      "ec2messages:AcknowledgeMessage",
      "ec2messages:DeleteMessage",
      "ec2messages:FailMessage",
      "ec2messages:GetEndpoint",
      "ec2messages:GetMessages",
      "ec2messages:SendReply"
    ]
  }));
  return role
}
